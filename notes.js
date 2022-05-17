
const fs = require('fs');
const path = require('path');
const [command, title, content] = process.argv.slice(2);

class NoteForNodeJS {
    constructor() {
        this.command = command;
        this.title = title;
        this.content = content;
    }
    sent() {
        switch (command) {
            case 'create':
                console.log("asdasdssssssssssssss");
                this.create(title, content);
                break;

            case 'list':
                this.list();
                break;

            case 'view':
                this.view(title);
                break;

            case 'remove':
                this.remove(title);
                break;

            default: console.log("Unknown command")
        }
    }

    init() {
        fs.writeFile(
            path.join(__dirname, '', 'notes.json'),
            '[]',
            (err) => {
                if (err) throw ('init ' + err);
                console.log("File was created ");
            }
        );
    }
    create(title, content) {

        fs.stat('notes.json', (err, data) => {
            if (err) {
                //Создаем файл nodes.json если его нет.
                init();
            }
        });

        fs.readFile('notes.json', (err, data) => {
            if (err) return console.error("Error in fs.readFile", err.message);
            const notes = JSON.parse(data);
            notes.push({ title, content });
            const json = JSON.stringify(notes);
            fs.writeFile('notes.json', json, (err) => {
                if (err) return console.error("error in  fs.writeFile", err.message);
                console.log("Note was created")
            })
        })

    }
    list() {
        fs.readFile('notes.json', (err, data) => {
            if (err) return console.error('something went wrong in list', err.message);
            const dataParsed = JSON.parse(data);
            console.log(dataParsed);
            dataParsed.forEach((element, index) => {
                console.log(index + 1 + "." + element.title);
            });
        })
    }
    view(title) {
        fs.readFile('notes.json', (err, data) => {
            if (err) return console.error('something wrong in view', err.message);
            const dataParsed = JSON.parse(data);
            dataParsed.forEach(el => {
                if (el.title === title) {
                    console.log(el);
                }
            })
        })
    }
    remove(title) {
        fs.readFile('notes.json', (err, data) => {
            if (err) return console.error('something went wrong in remove', err.message);
            const dataParsed = JSON.parse(data);
            let indexRemovedFile;
            dataParsed.forEach((el, index) => {
                if (el.title === title) {
                    indexRemovedFile = index;
                    return;
                }
            });
            if (!indexRemovedFile) return;
            dataParsed.splice(indexRemovedFile, 1);
            const json = JSON.stringify(dataParsed);
            fs.writeFile('notes.json', json, (err) => {
                if (err) return console.error("error in remove fs.writeFile", err.message);
                console.log("Note was remove")
            })
            console.log("indexRemovedFile", indexRemovedFile)
        })

    }
    
}
let note=new NoteForNodeJS();
note.sent();
