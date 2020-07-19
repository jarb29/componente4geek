import React, { useEffect, useRef } from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import GridContainer from './Grid/GridContainer.js';
import GridItem from './Grid/GridItem.js';
import Card from './Card/Card.js';
import CardBody from './Card/CardBody.js';
import styles from './assets/jss/material-dashboard-pro-react/views/extendedFormsStyle';

const useStyles = makeStyles(styles);

export default function App() {
	const [ simpleSelect, setSimpleSelect ] = React.useState('');
	const [ multipleSelect, setMultipleSelect ] = React.useState([]);
	const [ repos, setRepos ] = React.useState([]);
  const [ reposI, setReposI ] = React.useState([]);
  const [ reposII, setReposII ] = React.useState([]);

	const handleSimple = (event) => {
		setSimpleSelect(event.target.value);
	};
	const handleMultiple = (event) => {
		setMultipleSelect(event.target.value);
	};

	const classes = useStyles();

	useEffect(() => {
		webData();
	}, []);

	let webData = async (e) => {
		const resp = await fetch('https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data');
		const dato = await resp.json();
		setRepos(dato);
	};

	let webDataI = async (valor) => {
		const respI = await fetch(
			`https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data/${valor.target.value}`
		);
		const datoI = await respI.json();
		setReposI(datoI);
  };
  
  let webDataII = async (valor) => {
		const respII = await fetch(
			`https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data/components/${valor.target.value}`
		);
		const datoII = await respII.json();
    setReposII(datoII);
	};


  let varr;

	const categories = [ ...new Set(reposI.map((re) => re.name.split('.')[1]))];
  const categoriesI = [ ...new Set(reposI.map((re) => re.name)) ];
  const categoriesII = [ ...new Set(reposII.map((re) => re.name.split('.')[1]))];

  if (categories[0] === 'us' || categories[0] =='es') { varr = categories}
  else if (categories[0] === undefined) { varr = categoriesI }

  const useCompare = (val) => {
    const prevVal = usePrevious(val)
    return prevVal !== val
  }
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const hasValChanged = useCompare(reposI)

  console.log(hasValChanged, "valor que cambia")


	return (
		<div>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card>
						<CardBody>
							<br />
							<br />
							<GridContainer>
								<GridItem xs={12} sm={12} md={6}>
									<legend>Seleccione</legend>
									<GridContainer>
										<GridItem xs={12} sm={6} md={5} lg={5}>
											<FormControl fullWidth className={classes.selectFormControl}>
												<InputLabel htmlFor="simple-select" className={classes.selectLabel}>
													Seleccione un Archivo
												</InputLabel>
												<Select
													MenuProps={{
														className: classes.selectMenu
													}}
													classes={{
														select: classes.select
													}}
													value={simpleSelect}
													onChange={handleSimple}
													inputProps={{
														name: 'simpleSelect',
														id: 'simple-select'
													}}
													onClick={(e) => {
														webDataI(e);
													}}
												>
													{repos.map((re, key) => {
														return (
															<MenuItem
																classes={{
																	root: classes.selectMenuItem,
																	selected: classes.selectMenuItemSelected
																}}
																index={key}
																value={re.name}
															>
																{re.name}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</GridItem>
                    { varr.length !== 0 ? 
										<GridItem xs={12} sm={6} md={5} lg={5}>
											<FormControl fullWidth className={classes.selectFormControl}>
												<InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                        {(categories[0] === undefined)? 'Selecciones un archivo': 'Selecciones una localidad'}
												</InputLabel>
												<Select
													value={multipleSelect}
													onChange={handleMultiple}
													MenuProps={{ className: classes.selectMenu }}
													classes={{ select: classes.select }}
													inputProps={{
														name: 'multipleSelect',
														id: 'multiple-select'
                          }}
                          
                          onClick={(e) => {
														webDataII(e);
													}}
												>
													<MenuItem
														disabled
														classes={{
															root: classes.selectMenuItem
														}}
													>
														{(categories[0] === undefined)? 'Selecciones un archivo': 'Selecciones una localidad'}
													</MenuItem>
													{varr.map((localidad, key) => {
														return (
															<MenuItem
																classes={{
																	root: classes.selectMenuItem,
																	selected: classes.selectMenuItemSelectedMultiple
																}}
                                index={key}
																value={localidad}
															>
																{localidad}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</GridItem> : null}
                    { (categoriesII[0] !== undefined) ? 
										<GridItem xs={12} sm={6} md={5} lg={5}>
											<FormControl fullWidth className={classes.selectFormControl}>
												<InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                         Selecciones una localidad
												</InputLabel>
												<Select
													value={multipleSelect}
													onChange={handleMultiple}
													MenuProps={{ className: classes.selectMenu }}
													classes={{ select: classes.select }}
													inputProps={{
														name: 'multipleSelect',
														id: 'multiple-select'
                          }}
                        
												>
													<MenuItem
														disabled
														classes={{
															root: classes.selectMenuItem
														}}
													>
													Selecciones una localidad
													</MenuItem>
													{categoriesII.map((localidad, key) => {
														return (
															<MenuItem
																classes={{
																	root: classes.selectMenuItem,
																	selected: classes.selectMenuItemSelectedMultiple
																}}
                                index={key}
																value={localidad}
															>
																{localidad}
															</MenuItem>
														);
													})}
												</Select>
											</FormControl>
										</GridItem> : null}
									</GridContainer>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}
