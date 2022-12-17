import { useState, useMemo, useEffect } from 'react'
import db from '../data'
import { STORAGE_CATEGORIES } from '../contants'
import { groupBy } from '../helper'

/**
 * Hook Perso qui utilise un state pour gérer une liste de categories.
 * @returns Retourne le getter/setter
 */
const useStorageCategories = () => {
	const getLocal = useMemo(() => {
		return JSON.parse(window.localStorage.getItem(STORAGE_CATEGORIES))
	}, [])
	const [categories, setCategories] = useState(() => {
		if (getLocal !== null) {
			return getLocal
		} else {
			const data = groupBy(db, 'category')
			const allCategories = []
			let lastCategory = ''

			Object.keys(data).forEach((category) => {
				data[category].forEach((tracker) => {
					if (tracker.category !== lastCategory) {
						allCategories.push(tracker.category)
					}
					lastCategory = tracker.category
				})
			})
			allCategories.push('Défaut')
			return allCategories
		}
	})
	useEffect(() => {
		window.localStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories))
	}, [categories])
	return { categories, setCategories }
}
export { useStorageCategories }
