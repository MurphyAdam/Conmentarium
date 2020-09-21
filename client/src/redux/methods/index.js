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
	newArray.sort(function(a, b) {
		if(a.date_updated && b.date_updated) {
			return new Date(b.date_updated) - new Date(a.date_updated)
		}
		else if(a.date_created && b.date_created) {
			return new Date(b.date_created) - new Date(a.date_created)
		}
		else if(a.date && b.date) {
			return new Date(b.date) - new Date(a.date)
		}
		else {
			return a - b
		}
	})
	return newArray
}

export function concatArrayOfObjectsAndSortWithDateDesc(array, newArrayOfObjects=[]) {
	const newArray = [...array, ...newArrayOfObjects]
	newArray.sort(function(a, b) {
		if(a.date_updated && b.date_updated) {
			return new Date(a.date_updated) - new Date(b.date_updated)
		}
		else if(a.date_created && b.date_created) {
			return new Date(a.date_created) - new Date(b.date_created)
		}
		else if(a.date && b.date) {
			return new Date(a.date) - new Date(b.date)
		}
		else {
			return a - b
		}
	})
	return newArray
}

export const notificationTemplate = {
  title: '',
  message: '',
  position: 'bc',
  autoDismiss: 2,
  renderArray: (arr=[]) => (
    <ul>
      {arr.map(el => (
        <li>{el}</li>
      ))}
    </ul>
    ),
};