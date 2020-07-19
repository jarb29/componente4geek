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
import Editor from './Editor.js';

const useStyles = makeStyles(styles);

export default function App() {
  const [ simpleSelect, setSimpleSelect ] = React.useState('');
  const [ simpleSelectI, setSimpleSelectI ] = React.useState('');
  const [ simpleSelectII, setSimpleSelectII ] = React.useState('');
  const [ simpleSelectIII, setSimpleSelectIII ] = React.useState('');
	const [ multipleSelect, setMultipleSelect ] = React.useState([]);
	const [ repos, setRepos ] = React.useState([]);
  const [ reposI, setReposI ] = React.useState([]);
  const [ reposII, setReposII ] = React.useState([]);
  const [ reposIII, setReposIII ] = React.useState([]);
  const [filtered_repo, setFilteredRepo] = React.useState([{name:"alex"}]);
  const [filtered_repoI, setFilteredRepoI] = React.useState([{name:"alex"}]);
  const [categories, setCategories] = React.useState(["alex"]);
  const [categoriesI, setCategoriesI] = React.useState(["alex"]);
  const [url, setUrl] = React.useState([]);

	const handleSimple = (event) => {
		setSimpleSelect(event.target.value);
  };
  const handleSimpleI = (event) => {
		setSimpleSelectI(event.target.value);
  };
  const handleSimpleII = (event) => {
		setSimpleSelectII(event.target.value);
  };
  const handleSimpleIII = (event) => {
		setSimpleSelectIII(event.target.value);
	};
	const handleMultiple = (event) => {
		setMultipleSelect(event.target.value);
	};

  const classes = useStyles();

  // Variables 
  let categoriesII;
  let varr;
  let filtered_repos;
  let filtered_reposI;

  // Variable
  
	useEffect(() => {
		webData();
	}, []);

	let webData = async (e) => {
		const resp = await fetch('https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data');
    const dato = await resp.json();
    
    const dato_filtrado = dato.filter(e => e.name.split('.')[1] !== 'yml');
    setRepos(dato_filtrado);
	};

	let webDataI = async (valor) => {
    const urlBaseI = `https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data/${valor.target.value}`;
    const respI = await fetch(urlBaseI);
		const datoI = await respI.json();
    setReposI(datoI);
    const categories = [ ...new Set(datoI.map((re) => re.name.split('.')[1]))];
    const categoriesI = [ ...new Set(datoI.map((re) => re.name))];
    setCategories(categories);
    setCategoriesI(categoriesI);
    setFilteredRepo([{name:"alex"}]);
    setFilteredRepoI([{name:"alex"}]);
  };
  
  let webDataII = async (valor) => {
    const urlBaseII = 		`https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data/components/${valor.target.value}`
		const respII = await fetch(urlBaseII);
    const datoII = await respII.json();
    


    if (datoII.message) { 
      setReposII([{name:'alex.us.prueba'}]);

  }
    else if (datoII.filter(e => e.name.split('.')[1] === 'us').length > 0) 
    {
      categoriesII = [ ...new Set(datoII.map((re) => re.name.split('.')[1]))]
      setReposII(categoriesII) 
      setReposIII(datoII)
    }
    else {
          setReposII([{name:'alex.us.prueba'}]) 
    };
  };

  varr = [];
  if (categories[0] === 'us' || categories[0] ==='es') { varr = categories}
  else if (categories[0] === undefined) { varr = categoriesI }

  const reposI_filter = (e) =>{
    let selected_region = e.target.value;
    if (selected_region.length <= 2) {
    filtered_repos = reposI.filter(e => e.name.split('.')[1] === selected_region);
    setFilteredRepo(filtered_repos)}
  };

  const reposII_filter = (e) =>{
    let selected_region = e.target.value; 
    filtered_reposI = reposIII.filter(e => e.name.split('.')[1] === selected_region);
    setFilteredRepoI(filtered_reposI)
  };

  console.log(url, "la url")

  

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

                    {/* Fuction Webdata */}

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
                  

                  {/* Function webDataI */}

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
                            webDataII(e) 
                            reposI_filter(e);
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

                    {/* Function webDataII */}

                    { (reposI.filter(e => e.type === 'dir').length > 0) ?
                  
										<GridItem xs={12} sm={6} md={5} lg={5}>
                      
											<FormControl fullWidth className={classes.selectFormControl}>
												<InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                         Selecciones una localidad
												</InputLabel>
												<Select
													value={simpleSelectI}
													onChange={handleSimpleI}
													MenuProps={{ className: classes.selectMenu }}
													classes={{ select: classes.select }}
													inputProps={{
														name: 'multipleSelect',
														id: 'multiple-select'
                          }}
                          onClick = {e =>{reposII_filter(e)}}
												>
													<MenuItem
														disabled
														classes={{
															root: classes.selectMenuItem
                            }}
                            
													>
													Selecciones una localidad
													</MenuItem>
													{reposII.map((localidad, key) => {
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
										</GridItem>: null}

                  {/* Repositorios filtrados */}
                    { filtered_repo[0].name === 'alex' ? null :
                  <GridItem xs={12} sm={6} md={5} lg={5}>
                    
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                       Selecciones un Repositorio
                      </InputLabel>
                      <Select
                        value={simpleSelectII}
                        onChange={handleSimpleII}
                        MenuProps={{ className: classes.selectMenu }}
                        classes={{ select: classes.select }}
                        inputProps={{
                          name: 'multipleSelect',
                          id: 'multiple-select'
                        }}
                        // onClick = {e =>{reposII_filter(e)}}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                          
                        >
                            Selecciones un Repositorio
                        </MenuItem>
                        {filtered_repo.map((repo, key) => {
                          return (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              index={key}
                              value={repo.path}
                            >
                              {repo.path}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>}


                    {/* Repositorios filtrados */}
                    { filtered_repoI[0].name === 'alex' ? null :
                  <GridItem xs={12} sm={6} md={5} lg={5}>
                    
                    <FormControl fullWidth className={classes.selectFormControl}>
                      <InputLabel htmlFor="multiple-select" className={classes.selectLabel}>
                       Selecciones un Repositorio
                      </InputLabel>
                      <Select
                        value={simpleSelectIII}
                        onChange={handleSimpleIII}
                        MenuProps={{ className: classes.selectMenu }}
                        classes={{ select: classes.select }}
                        inputProps={{
                          name: 'multipleSelect',
                          id: 'multiple-select'
                        }}
                        onClick = {e =>{setUrl(e.target.value)}}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                          
                        >
                            Selecciones un Repositorio
                        </MenuItem>
                        {filtered_repoI.map((repo, key) => {
                          return (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelectedMultiple
                              }}
                              index={key}
                              value={repo}
                            >
                              {repo.path}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>}
									</GridContainer>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
        <Editor value = {url}/>
			</GridContainer>
		</div>
	);
}
