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
    const repos_I = dato.filter((e) => e.name.split('.')[e.name.split('.').length-1] === 'yaml');

    for (let i= 0; i < folders_I.length; i++){
      let resp =  await fetch(urlBaseI+folders_I[i].path);
      let dato = await resp.json();
      let new_folders = dato.filter((e) => e.name.split('.').length === 1);
      let new_repo = dato.filter((e) => e.name.split('.')[e.name.split('.').length-1] === 'yaml');
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
      let new_repo = dato.filter((e) => e.name.split('.')[e.name.split('.').length-1] === 'yaml');


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

const nationalities = [ ...new Set(total_repos.map((re) => re.name.split('.')[1])) ];

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

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
	{ title: 'The Shawshank Redemption', year: 1994 },
	{ title: 'The Godfather', year: 1972 },
	{ title: 'The Godfather: Part II', year: 1974 },
	{ title: 'The Dark Knight', year: 2008 },
	{ title: '12 Angry Men', year: 1957 },
	{ title: "Schindler's List", year: 1993 },
	{ title: 'Pulp Fiction', year: 1994 },
	{ title: 'The Lord of the Rings: The Return of the King', year: 2003 },
	{ title: 'The Good, the Bad and the Ugly', year: 1966 },
	{ title: 'Fight Club', year: 1999 },
	{ title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
	{ title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
	{ title: 'Forrest Gump', year: 1994 },
	{ title: 'Inception', year: 2010 },
	{ title: 'The Lord of the Rings: The Two Towers', year: 2002 },
	{ title: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ title: 'Goodfellas', year: 1990 },
	{ title: 'The Matrix', year: 1999 },
	{ title: 'Seven Samurai', year: 1954 },
	{ title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
	{ title: 'City of God', year: 2002 },
	{ title: 'Se7en', year: 1995 },
	{ title: 'The Silence of the Lambs', year: 1991 },
	{ title: "It's a Wonderful Life", year: 1946 },
	{ title: 'Life Is Beautiful', year: 1997 },
	{ title: 'The Usual Suspects', year: 1995 },
	{ title: 'Léon: The Professional', year: 1994 },
	{ title: 'Spirited Away', year: 2001 },
	{ title: 'Saving Private Ryan', year: 1998 },
	{ title: 'Once Upon a Time in the West', year: 1968 },
	{ title: 'American History X', year: 1998 },
	{ title: 'Interstellar', year: 2014 },
	{ title: 'Casablanca', year: 1942 },
	{ title: 'City Lights', year: 1931 },
	{ title: 'Psycho', year: 1960 },
	{ title: 'The Green Mile', year: 1999 },
	{ title: 'The Intouchables', year: 2011 },
	{ title: 'Modern Times', year: 1936 },
	{ title: 'Raiders of the Lost Ark', year: 1981 },
	{ title: 'Rear Window', year: 1954 },
	{ title: 'The Pianist', year: 2002 },
	{ title: 'The Departed', year: 2006 },
	{ title: 'Terminator 2: Judgment Day', year: 1991 },
	{ title: 'Back to the Future', year: 1985 },
	{ title: 'Whiplash', year: 2014 },
	{ title: 'Gladiator', year: 2000 },
	{ title: 'Memento', year: 2000 },
	{ title: 'The Prestige', year: 2006 },
	{ title: 'The Lion King', year: 1994 },
	{ title: 'Apocalypse Now', year: 1979 },
	{ title: 'Alien', year: 1979 },
	{ title: 'Sunset Boulevard', year: 1950 },
	{ title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
	{ title: 'The Great Dictator', year: 1940 },
	{ title: 'Cinema Paradiso', year: 1988 },
	{ title: 'The Lives of Others', year: 2006 },
	{ title: 'Grave of the Fireflies', year: 1988 },
	{ title: 'Paths of Glory', year: 1957 },
	{ title: 'Django Unchained', year: 2012 },
	{ title: 'The Shining', year: 1980 },
	{ title: 'WALL·E', year: 2008 },
	{ title: 'American Beauty', year: 1999 },
	{ title: 'The Dark Knight Rises', year: 2012 },
	{ title: 'Princess Mononoke', year: 1997 },
	{ title: 'Aliens', year: 1986 },
	{ title: 'Oldboy', year: 2003 },
	{ title: 'Once Upon a Time in America', year: 1984 },
	{ title: 'Witness for the Prosecution', year: 1957 },
	{ title: 'Das Boot', year: 1981 },
	{ title: 'Citizen Kane', year: 1941 },
	{ title: 'North by Northwest', year: 1959 },
	{ title: 'Vertigo', year: 1958 },
	{ title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
	{ title: 'Reservoir Dogs', year: 1992 },
	{ title: 'Braveheart', year: 1995 },
	{ title: 'M', year: 1931 },
	{ title: 'Requiem for a Dream', year: 2000 },
	{ title: 'Amélie', year: 2001 },
	{ title: 'A Clockwork Orange', year: 1971 },
	{ title: 'Like Stars on Earth', year: 2007 },
	{ title: 'Taxi Driver', year: 1976 },
	{ title: 'Lawrence of Arabia', year: 1962 },
	{ title: 'Double Indemnity', year: 1944 },
	{ title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
	{ title: 'Amadeus', year: 1984 },
	{ title: 'To Kill a Mockingbird', year: 1962 },
	{ title: 'Toy Story 3', year: 2010 },
	{ title: 'Logan', year: 2017 },
	{ title: 'Full Metal Jacket', year: 1987 },
	{ title: 'Dangal', year: 2016 },
	{ title: 'The Sting', year: 1973 },
	{ title: '2001: A Space Odyssey', year: 1968 },
	{ title: "Singin' in the Rain", year: 1952 },
	{ title: 'Toy Story', year: 1995 },
	{ title: 'Bicycle Thieves', year: 1948 },
	{ title: 'The Kid', year: 1921 },
	{ title: 'Inglourious Basterds', year: 2009 },
	{ title: 'Snatch', year: 2000 },
	{ title: '3 Idiots', year: 2009 },
	{ title: 'Monty Python and the Holy Grail', year: 1975 }
];
