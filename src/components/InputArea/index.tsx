import { Item } from '../../types/Item'
import { categories } from '../../data/categories'

import * as C from './styles'
import React, { useState } from 'react'

type Props = {
    onAdd: (item: Item) => void;
}

export const InputArea = ({ onAdd }: Props) => {
    const handleAddEvent = () => {
    let errors: string[] = [];

    if(isNaN(new Date(dateField).getTime())) {
        errors.push('Data inválida!');
    }
    if(!categoryKeys.includes(categoryField)) {
        errors.push('Categoria inválida!');
    }
    if(titleField === '') {
        errors.push('Título vazio!');
    }
    console.log(valueField)
    if(valueField <= 0) {
        errors.push('Valor inválido!');
    }

    if(errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        onAdd({
        date: new Date(dateField),
        category: categoryField,
        title: titleField,
        value: valueField
        });
        clearFields();
    }
    }

    const clearFields = () => {
        setDateField('');
        setCategoryField('');
        setTitleField('');
        setValueField(0);
    }

    const [dateField, setDateField] = useState('')
    const [categoryField, setCategoryField] = useState('')
    const [titleField, setTitleField] = useState('')
    const [valueField, setValueField] = useState(0)

    const categoryKeys: string[] = Object.keys(categories)

    return (
        <C.Container>
            <C.InputLabel>
                <C.InputTitle>Data</C.InputTitle>
                <C.Input value={dateField} onChange={e => setDateField(e.target.value)} type="date" />
            </C.InputLabel>
            <C.InputLabel>
                <C.InputTitle>Categoria</C.InputTitle>
                <C.Select value={categoryField} onChange={e => setCategoryField(e.target.value)}>
                    <option disabled></option>
                    {categoryKeys.map( (categoryKey, index) => (
                        <option key={index} value={categoryKey}>{categories[categoryKey].title}</option>
                    ))}
                </C.Select>
            </C.InputLabel>
            <C.InputLabel>
                <C.InputTitle>Título</C.InputTitle>
                <C.Input value={titleField} onChange={e => setTitleField(e.target.value)} type="text" />
            </C.InputLabel>
            <C.InputLabel>
                <C.InputTitle>Valor</C.InputTitle>
                <C.Input type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} />
            </C.InputLabel>
            <C.InputLabel>
                <C.InputTitle>&nbsp;</C.InputTitle>
                <C.Button onClick={handleAddEvent}>Adicionar</C.Button>
             </C.InputLabel>
        </C.Container>
    )
}