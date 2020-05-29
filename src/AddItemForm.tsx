import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemPropsType) {
    let [newTaskTitle, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }

    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setTitle('')
        } else {
            setError('title is required');
        }
    }


    return <div>
        <input value={newTaskTitle}
               onChange={onNewTitleChangeHandler}
               onKeyPress={onKeyPress}
               className={error ? 'error' : ''}
        />

        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}