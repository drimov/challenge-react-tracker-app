import {
	FormGroup,
	InputLabel,
	Input,
	Button,
	Container,
	Select,
	MenuItem,
} from '@mui/material'
import { useEditCategory } from '../../hooks/useEditCategory'
// import './TrackerEditCategory.css'
import '../TrackerEditForm/TrackerEditForm.css'
import { useState } from 'react'

const TrackerEditCategory = ({
	onAddCategory,
	onDeleteCategory,
	onUpdateCategory,
	listCategories,
}) => {
	const {
		category,
		activeInput,
		activeSelect,
		activeButtons,
		setCategory,
		editCategory,
		updateCategory,
		deleteCategory,
		newCategory,
	} = useEditCategory()
	const [selectedCategory, setSelectedCategory] = useState(category)

	const handleDeleteCategory = () => {
		setSelectedCategory('')
		onDeleteCategory(category)
		deleteCategory()
	}
	const handleUpdateCategory = () => {
		setSelectedCategory(category)
		onUpdateCategory(selectedCategory, category)
		updateCategory()
	}
	const handleCategoryName = (e) => {
		selectedCategory !== null
			? setCategory(e.target.value)
			: editCategory(e.target.value)
	}
	const handleNewCategory = () => {
		setSelectedCategory(null)
		newCategory('')
	}
	const handleOnSubmit = (e) => {
		e.preventDefault()
		onAddCategory(category)
	}
	const handleChangeCategory = (e) => {
		setSelectedCategory(e.target.value)
		setCategory(e.target.value)
	}
	return (
		<form
			className='TrackerEditForm'
			onSubmit={handleOnSubmit}>
			<FormGroup>
				<InputLabel htmlFor='categoryName'>Nom de la catégorie : </InputLabel>
				<Input
					disabled={!activeInput}
					id='categoryName'
					type='text'
					placeholder='category name...'
					onChange={handleCategoryName}
					value={category ?? ''}
				/>
				<InputLabel>Categorie:</InputLabel>
				<Select
					disabled={!activeSelect}
					defaultValue={selectedCategory ?? ''}
					value={selectedCategory ?? ''}
					onChange={handleChangeCategory}>
					{listCategories.map((item, key) => (
						<MenuItem
							value={item}
							key={key}>
							{item}
						</MenuItem>
					))}
				</Select>
				<InputLabel>Actions</InputLabel>
				<Container>
					<Button
						onClick={handleNewCategory}
						variant='contained'>
						Nouvelle catégorie
					</Button>
					<Button
						disabled={!activeButtons.btnSave}
						type='submit'
						variant='contained'>
						Ajouter
					</Button>
					<Button
						disabled={!activeButtons.btnDel}
						onClick={handleDeleteCategory}
						variant='contained'>
						Supprimer
					</Button>
					<Button
						disabled={!activeButtons.btnUp}
						onClick={handleUpdateCategory}
						variant='contained'>
						Mettre à jour
					</Button>
				</Container>
			</FormGroup>
		</form>
	)
}
export { TrackerEditCategory }
