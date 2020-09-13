import React from "react";
// react must be in scope for notificationTemplate's renderArray method
// which includes jsx

export function updateItemInArray(array, newItem) {
    let items = array.filter(item => item.id !== newItem.id );
    items = [...items, newItem].sort( (a, b) => a.id-b.id);
    return items;
}

export function removeItemFromArray(array, itemId) {
	return array.filter(item => item.id !== itemId)
}

export function addObjectToArray(array, newItem) {
	const checkIfExist = array.find( item => item.id !== newItem.id );
	if(checkIfExist){
		return updateItemInArray(array, newItem)
	}
	else {
		const newArray = [...array, newItem]
		return newArray
	}
}

export function updateObjectInArrayWithId(array, newItem) {
	return array.map(item => {
		if (item.id !== newItem.id) {
			// This isn't the item we care about - keep it as-is
			return item
			}
		// Otherwise, this is the one we want - return an updated value
		return {
		...item,
		...newItem
		}
	})
}

export function filterArrayWithId(array, itemId) {
	return array.filter(item => {
		if (item.id !== itemId) {
			// This isn't the item we care about - keep it as-is
			return item
			}
		return false
	})
}

export function filterArrayWithName(array, itemId) {
	return array.filter(item => {
		if (item.name !== itemId) {
			// This isn't the item we care about - keep it as-is
			return item
			}
		return false
	})
}

export function updateObjectInArrayWithName(array, newItem) {
	return array.map(item => {
		if (item.name !== newItem.name) {
			// This isn't the item we care about - keep it as-is
			return item
			}
		// Otherwise, this is the one we want - return an updated value
		return {
		...item,
		...newItem
		}
	})
}

export function concatArrayOfObjectsAndSortWithDateAsc(array, newArrayOfObjects=[]) {
	const newArray = [...array, ...newArrayOfObjects]
	newArray.sort((a, b) => new Date(b.date) - new Date(a.date))
	return newArray
}

export function concatArrayOfObjectsAndSortWithDateDesc(array, newArrayOfObjects=[]) {
	const newArray = [...array, ...newArrayOfObjects]
	newArray.sort((a, b) => new Date(a.date) - new Date(b.date))
	return newArray
}

export const notificationTemplate = {
  title: '',
  message: '',
  position: 'bc',
  autoDismiss: 8,
  renderArray: (arr=[]) => (
    <ul>
      {arr.map(el => (
        <li>{el}</li>
      ))}
    </ul>
    ),
};