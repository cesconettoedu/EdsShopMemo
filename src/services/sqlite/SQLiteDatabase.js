import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase("db.db")

export default db 