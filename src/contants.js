const blueColor = '#0BA7C0'
const orangeColor = '#FC8D15'
const greenColor = '#449D47'

const MSG_TRACKER = {
	ADD: 'Le tracker à bien été créer',
	DEL: 'Le tracker à bien été supprimer',
	MAJ: 'Le tracker à été mis à jour',
}
const MSG_CATEGORY = {
	ADD: 'La catégorie à bien été créer',
	DEL: 'La catégorie à bien été supprimer',
	MAJ: 'La catégorie à été mis à jour',
}
const MSG_CATEGORY_ERROR = {
	EXIST: 'La catégorie existe déjà.',
	EMPTY: 'Le champs de la catégorie est nulle.',
	USED: 'La catégorie est utilisé par des trackers. Veuillez changer ou supprimer les trackers.',
}
const SORT_TRACKER = {
	IN_PROGRESS: 'in progress',
	COMPLETED: 'completed',
	ALL: 'all',
	SEARCH: 'search',
}
const STORAGE_TRACKERS = 'trackers'
const STORAGE_CATEGORIES = 'categories'

export {
	blueColor,
	orangeColor,
	greenColor,
	MSG_TRACKER,
	MSG_CATEGORY,
	MSG_CATEGORY_ERROR,
	SORT_TRACKER,
	STORAGE_TRACKERS,
	STORAGE_CATEGORIES,
}
