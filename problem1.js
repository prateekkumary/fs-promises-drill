import { promises as fs } from 'fs';
// import {copyFileSync, promises as fs, futimesSync} from 'fs';

  export function createDirectory(path, x) {

    fs.mkdir(path).then(() => {
        console.log(`${path} directory created`);
        return createFiles(path, x);
    }).catch((err) => {

        console.log('Error1 found', err);

    });
}

function createFiles(path, x) {
    const filesNames = [];

    for (let i = 0; i < x; i++) {
        const filename = `files-${i}.json`;

        const fileNamesPromises = fs.writeFile(`${path}/${filename}`, " ")

            .then(() => {
                console.log(`${filename} is created successfully`);


            })
            .catch((err) => {

                console.log("Error2 found ", err);
            })

            filesNames.push(filename);

        // console.log(filesNames);
    }
    return Promise.all(filesNames)

        .then((fileNames) => {

            return deleteFiles(path, fileNames);
        }).catch((err) => {

            console.log("Error3 creating files", err)
        })
}

function deleteFiles(path, fileNames) {
    // console.log(filesNames);

    // console.log(path);
    const fileDeletionPromises = fileNames.map((filename) => {
        return fs.unlink(`${path}/${filename}`)
            .then(() => {
                console.log(`${filename} suceesfully deleted`);
            })
            .catch((err) => {
                console.log("Error4 found while deltion ", err);
            });
    });


    return Promise.all(fileDeletionPromises)

        .then(() => {
            console.log("All files are deleted succesfully");
        })
        .catch((err) => {
            console.log("Error5 found", err);
        })
}



// const result=createDirectory('./rndomFiles', 2);