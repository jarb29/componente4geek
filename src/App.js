import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
	const [ repos, setRepos ] = React.useState([]);
  const [ reposFiltered, setReposFiltered ] = React.useState([]);




	const handleSimple = (event) => {
		setSimpleSelect(event.target.value);
	};


	const classes = useStyles();

  // Variables
  let urlBase = 'https://api.github.com/repos/4GeeksAcademy/website-V2/contents/src/data';
  let urlBaseI = 'https://api.github.com/repos/4GeeksAcademy/website-V2/contents/';


  // Variable


	useEffect(() => {
    webData();
  }, []);



  let webData = async (e) => {
    let new_repository = [];
    let new_repository_I = [];
    let new_total_folder =[];
    let new_total_folder_I =[];
    let new_total_folder_flat = [];
    let new_total_folder_flat_I = [];
    let new_repository_flat =[];
    let new_repository_flat_I =[];

	const resp = await fetch(urlBase);
    const dato = await resp.json();
    const folders_I = dato.filter((e) => e.name.split('.').length === 1);
	const repos_I = dato.filter((e) => e.name.split('.')[e.name.split('.').length-1] === 'yml');
	// new_repository.push(repos_I)

    for (let i= 0; i < folders_I.length; i++){
      let resp =  await fetch(urlBaseI+folders_I[i].path);
      let dato = await resp.json();
      let new_folders = dato.filter((e) => e.name.split('.').length === 1);
      let new_repo = dato.filter((e) => e.name.split('.')[e.name.split('.').length-1] === 'yml');
      if (new_folders.length > 0) {
        new_total_folder.push(new_folders)
      };

      if (new_repo.length > 0) {
        new_repository.push(new_repo)
      };
    };
  
    for (let a = 0; a < new_total_folder.length; a++) {
      new_total_folder_flat = new_total_folder_flat.concat(new_total_folder[a])
    };

    for (let a = 0; a < new_repository.length; a++) {
      new_repository_flat = new_repository_flat.concat(new_repository[a])
    };  

    for (let i= 0; i < new_total_folder_flat.length; i++){
      let resp =  await fetch(urlBaseI+new_total_folder_flat[i].path);
      let dato = await resp.json();
      let new_folders = dato.filter((e) => e.name.split('.').length === 1);
      let new_repo = dato.filter((e) => e.name.split('.')[e.name.split('.').length-1] === 'yml');


      if (new_folders.length > 0) {
        new_total_folder_I.push(new_folders);
      };

      if (new_repo.length > 0) {
        new_repository_I.push(new_repo);
      };
    };

    for (let d = 0; d < new_total_folder.length; d++) {
      new_total_folder_flat_I = new_total_folder_flat_I.concat(new_total_folder_I[d])
    };

    for (let c = 0; c < new_repository_I.length; c++) {
      new_repository_flat_I = new_repository_flat_I.concat(new_repository_I[c])
    };

    setRepos([repos_I, new_repository_flat, new_repository_flat_I]);

};

let total_repos = [];
for (let c = 0; c < repos.length; c++) {
  total_repos  = total_repos.concat(repos[c])
};

console.log(total_repos, "todos los repos")

const nationalities = [ ...new Set(total_repos.map((re) => re.name.split('.')[1] !== 'yml'? re.name.split('.')[1]:null))];

const filter_repos = (event) => {
  let nation = event.target.value;
  let repos_filtered = total_repos.filter((e) => e.name.split('.')[1] === nation);
  setReposFiltered(repos_filtered)
};

console.log(reposFiltered, "los repos filtrados")

  



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
													Seleccione un Region
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
                          onClick = {e => {filter_repos(e)}}
												>
													{nationalities? nationalities.map((re, key) => {
                            console.log(re, "re dentro del repo")
														return (
															<MenuItem
																classes={{
																	root: classes.selectMenuItem,
																	selected: classes.selectMenuItemSelected
																}}
																index={key}
                                                                 value={re}
                               
															>
																{re}
															</MenuItem>
														);
													}):null}
												</Select>
											</FormControl>
										</GridItem>
										<div style={{ width: 300 }}>

											{/* <Autocomplete
												id="free-solo-demo"
												freeSolo
												options={reposFiltered.map((option) => option.name)}
												renderInput={(params) => (
													<TextField
														{...params}
														label="freeSolo"
														margin="normal"
                            variant="outlined"                  
													/>
												)}
											/> */}
											<Autocomplete
												freeSolo
												id="free-solo-2-demo"
                        disableClearable
												options={reposFiltered.map((option) => option.name)}
												renderInput={(params) => (
													<TextField
                            {...params}
          
														label="Busqueda del archivo"
														margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
													/>
												)}
											/>
										</div>
									</GridContainer>
								</GridItem>
             
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
				<Editor />
			</GridContainer>
		</div>
	);
}
