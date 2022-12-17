import { useState, useMemo, useEffect } from 'react'
import db from '../data'
import { STORAGE_TRACKERS } from '../contants'

/**
 * Hook Perso qui utilise un state pour gérer la base de donnée.
 * @returns Retourne les données et une fonction
 */
const useStorageTrackers = () => {
	const getLocal = useMemo(
		() => JSON.parse(window.localStorage.getItem(STORAGE_TRACKERS)),
		[]
	)
	const [store, setStore] = useState(getLocal || db)

	useEffect(() => {
		window.localStorage.setItem(STORAGE_TRACKERS, JSON.stringify(store))
	}, [store])

	return { store, setStore }
}
export { useStorageTrackers }
