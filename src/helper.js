/**
 * groupe en fonction d'une proprieté par
 * exemple si on veut grouper par category
 * groupBy(array,'category')
 *
 * [{name: "mike", category:"sport"},
 * {name: "mike", category:"sport"},
 * {name: "mike", category:"perso"}]
 * donnera
 * {
 *  'sport':[...],
 *  'perso':[...]
 * }
 * @param {*} tableauObjets
 * @param {*} propriete
 * @returns
 */
export function groupBy(tableauObjets, propriete) {
	return tableauObjets.reduce(function (acc, obj) {
		var cle = obj[propriete]
		if (!acc[cle]) {
			acc[cle] = []
		}
		acc[cle].push(obj)
		return acc
	}, {})
}

export const diffTime = (start, end) => {
	// objectif ! difference entre 2 dates :
	// avoir une chaine de caracteres qui affiche : Days : Heures : Minutes : secondes : Milliseconde
	// algo ! on faire faire la difference en ms : calculer les jours, sourstraire, les heures + sourstraires etc ...tracker

	//1 : date de depart et date de fin (date de fin peut etre undefined = now)
	//2 : calcul delta diff /1000 pour avoir en seconde
	//3 : calcul nb days : delta/ 86400 : nombre de seconde / 86400 (seconde dans days) pour avoir le nombre de days
	//4 : calcul nb heures  :delta / 3600 : nombre de seconde restante / 3600 polur avoir le nombre d'heures restante
	//5 : calcul nb minutes  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes
	//6 : calcul nb sec  :delta / 60 : nombre de seconde restant / 60 pour avoir les minutes

	start = new Date(start)
	end = end ? new Date(end) : new Date()

	let durationStr = ''

	var delta = Math.abs(start - end) / 1000

	// calculate (and subtract) whole days
	var days = Math.floor(delta / 86400)
	delta -= days * 86400

	if (days > 0) {
		durationStr = days + ' j '
	}
	// calculate (and subtract) whole hours
	var hours = Math.floor(delta / 3600) % 24
	delta -= hours * 3600

	if (hours > 0) {
		durationStr = durationStr + hours + ' h '
	}
	// calculate (and subtract) whole minutes
	var minutes = Math.floor(delta / 60) % 60
	delta -= minutes * 60
	if (minutes > 0) {
		durationStr = durationStr + minutes + ' min '
	}
	// what's left is seconds
	var seconds = Math.floor(delta % 60)
	if (seconds > 0) {
		durationStr = durationStr + seconds + ' sec '
	}

	return durationStr
}

export const getDateTimeForPicker = (date = new Date()) => {
	const dateIso = date.toISOString()
	return dateIso.substring(0, dateIso.length - 5)
}

/**
 * Retourne l'ensemble des trackers
 * qui correpond à la recherche.
 * @param {*} trackers Liste de tout les trackers
 * @param {*} text Le texte à rechercher
 */
export const search = (trackers, text) => {
	return trackers.filter(
		(item) => item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
	)
}
/**
 * Récupère la liste des trackers terminés
 * @param {*} trackers Prend une liste trackers
 * @returns Retourne une liste de trackers
 */
export const trackersComplete = (trackers) => {
	return trackers.filter((item) => item.endtime !== '')
}
/**
 * Récupère la liste des trackers en cours
 * @param {*} trackers Prend une liste trackers
 * @returns Retourne une liste de trackers
 */
export const trackersInProgess = (trackers) => {
	return trackers.filter((item) => item.endtime === '')
}

/**
 * Récupère le nombre de tracker ternminé
 * @param {*} trackers Prend une liste de trackers
 * @returns Retourne un nombre
 */
export const taskNbProgress = (trackers) => {
	return trackersInProgess(trackers).length
}

/**
 * Récupére le nombre de tracker en cours
 * @param {*} trackers Prend une liste de trackers
 * @returns Retourne un nombre
 */
export const taskNbComplete = (trackers) => {
	return trackersComplete(trackers).length
}

/**
 *
 * Par défaut on tests l'ensemble des variables pour valider un tracker.
 * Si l'option est faux on test que l'id.
 *
 * @param {*} tracker  Prend un tracker en parmètre.
 * @param {*} option  Prend en option un boolean, par défaut à vrai.
 * @returns	Retourne un tableau avec les erreurs.
 */
export const formError = (tracker, option = true) => {
	let error = []
	if (tracker.id === '') {
		error.push('il manque le tracker id')
	}
	if (option) {
		if (tracker.name === '') {
			error.push('veuillez renseigner le nom du tracker')
		}
		if (tracker.starttime === '') {
			error.push('veuillez renseigner la date de début')
		}
		if (tracker.category === '') {
			error.push('veuillez renseigner la categorie')
		}
	}
	return error
}

/**
 * Permet de savoir si la catégorie est présent
 * dans le tableau (trackers ou categories)
 * @param {*} tabs Prend l'ensemble d'un tableau
 * @param {*} category Prend un texte
 * @returnsRetourne un booléen
 */
export const isCategoryPresent = (tabs, category) => {
	const result = tabs.filter((item) => {
		if (typeof item === 'object') {
			return item.category === category
		} else {
			return item === category
		}
	}).length
	return result > 0 ? false : true
}

/**
 * Remplace l'ancienne catégorie par la nouvelle.
 * @param {*} tabs Prend un tableau (trackers/categorie)
 * @param {*} oldCategory Prend l'ancienne catégorie
 * @param {*} newCategory Prend la nouvelle catégorie
 * @returns Retourne les catégories avec la nouvelle catégorie
 */
export const updateTabs = (tabs, oldCategory, newCategory) => {
	const newCategories = tabs.map((item) => {
		if (typeof item === 'object') {
			if (item.category === oldCategory) {
				item.category = newCategory
			}
		} else {
			if (item === oldCategory) {
				item = newCategory
			}
		}
		return item
	})
	return newCategories
}
