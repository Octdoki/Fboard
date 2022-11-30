import {takeLatest, all, put, fork} from "redux-saga/effects"
import * as types from "./actionTypes"
import firebaseDb from "../firebase"
import { addContactsFail, addContactsSuccess, deleteContactsFail, deleteContactsSuccess, editContactsFail, editContactsSuccess, getContactsFail, getContactsSuccess } from "./actions"

export function* onLoadContactAsync() {
    try{
        const contacts =yield new Promise((resolve) =>
        firebaseDb.child("contacts").on("value" , resolve)
        )
        if (contacts.val() !== null){
            yield put(getContactsSuccess(contacts.val()))
        } else {
            yield put(getContactsSuccess({}))
        }
    } catch(error){
        yield put(getContactsFail())

    }
}

export function* onDeleteContactAsync({payload : id}) {
    try{
        yield firebaseDb.child(`contacts/${id}`).remove()
        yield put(deleteContactsSuccess())   
    } catch(error){
        yield put(deleteContactsFail())

    }
}

export function* onAddContactAsync({payload : contact}) {
    try{
        yield firebaseDb.child("contacts").push(contact)
        yield put(addContactsSuccess())   
    } catch(error){
        yield put(addContactsFail())

    }
}

export function* onEditContactAsync({payload : { id, initialState: contact}}) {
    try{
        yield firebaseDb.child(`contacts/${id}`).set(contact)
        yield put(editContactsSuccess())   
    } catch(error){
        yield put(editContactsFail())

    }
}


export function* onLoadContact() {
    yield takeLatest(types.GET_CONTACTS_START, onLoadContactAsync)
}

export function* onDeleteContact() {
    yield takeLatest(types.DELETE_CONTACTS_START, onDeleteContactAsync)
}

export function* onAddContact() {
    yield takeLatest(types.ADD_CONTACTS_START, onAddContactAsync)
}
export function* onEditContact() {
    yield takeLatest(types.EDIT_CONTACTS_START, onEditContactAsync)
}



const contactSagas = [fork(onLoadContact), fork(onDeleteContact), fork(onAddContact), fork(onEditContact)]

export default function* rootSaga() {
    yield all([...contactSagas])
}