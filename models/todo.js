const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS todos (id integer primary key, title, status)';
    db.run(sql);
    db.run('INSERT INTO todos(title, status) VALUES(?, ?)', ['create example', false]);
    db.run('INSERT INTO todos(title, status) VALUES(?, ?)', ['sleep', false]);
    db.run('INSERT INTO todos(title, status) VALUES(?, ?)', ['will be ok', true]);
});

class Todo {
    constructor(id, title, status) {
        this.id = id;
        this.title = title;
        this.status = status;
    }

    static one(id, callback) {
        const sql = 'SELECT *  FROM todos WHERE id = ?';
        db.all(sql, id, callback);
    };

    static all(callback) {
        db.all('SELECT * FROM todos', callback);
    };

    static add(todo) {
        const sql = 'INSERT INTO todos(title, status) VALUES(?, ?)';
        db.run(sql, [todo.title, todo.status]);
    };

    static update(todo, callback) {
        console.log(todo);
        const sql = 'UPDATE todos SET title = ?, status = ? WHERE id = ?';
        db.run(sql, [todo.title, todo.status, todo.id], callback);
    };

    static delete(id, callback) {
        const sql = 'DELETE FROM todos where id = ?';
        db.run(sql, id, callback);
    };
}

module.exports = Todo;
