## Description

The idea behind this project is to create a subtitle translator application that sends the result via email. 
The translation is performed by using historical data stored in a [Translation Management System (TMS)](https://en.wikipedia.org/wiki/Translation_management_system). TMS is a system that stores past translations to be reused.


The Project contains two different APIs:
- Upload-Api
- Tms-Api

## Getting Started

The Api's are packaged with Docker and each one has its own Docker file. In order to run them together you can use:
``` 
docker-compose up -d --build
```



##### A small UI to upload files is provided:
- non-dockerised setup [here](http://localhost:3000).
- dockerised setup [here](http://127.0.0.1:3000).


#### HINT
You need to have `.env` files in each of the projects from them to work. An `.env.example` is provided as reference.

Sendgrid `API key` required with `verified email`.

### Upload API

#### About

Upload-Api accepts a form with email source language, target language, and a list of files that the user expects to translate in a specific format `.txt`. 

Example of a subtitle file:

```
1 [00:00:12.00 - 00:01:20.00] I am Arwen - I've come to help you.
2 [00:03:55.00 - 00:04:20.00] Come back to the light.
3 [00:04:59.00 - 00:05:30.00] Nooo, my precious!!.
```

The output from a translated subtitle file:

```
1 [00:00:12.00 - 00:01:20.00] Ich bin Arwen - Ich bin gekommen, um dir zu helfen.
2 [00:03:55.00 - 00:04:20.00] Komm zurück zum Licht.
3 [00:04:59.00 - 00:05:30.00] Nein, my Schatz!!.
```

#### Documentation
You can find the Api Swagger file:

- non-dockerised setup [here](http://localhost:3000/api-docs).
- dockerised setup [here](http://127.0.0.1:3000/api-docs).

#### Setup
```
npm install
```

#### Architecture

##### Upload API 
![Upload Api](https://i.ibb.co/6441KjJ/Upload-API.png)
Link [here](https://swimlanes.io/u/uQ5xyd9Lg).


##### TMS API

###### Introduce Endpoint

![Introduce endpoint](https://i.ibb.co/CJnZRsq/TMS-Introduce-endpoint.png)
Link [here](https://swimlanes.io/u/vb8-Wyvfa).

###### Translate Endpoint

![Translate Endpoint](https://i.ibb.co/hK07xCd/TMS-translate.png)
Link [here](https://swimlanes.io/u/RdfxC0su9).



#### Test
You can run the tests like this:
```
npm test
```

#### Usage
Request will go through a validation process to verify if all the required input fields - files provided and in correct format.
If there are any errors it will return a descriptive error message.

Example of invalid request with no file attached:
`{"status":false,"message":"414 - Please attach a file"}`

The files will be saved in the `./upload` folder which is located in the root of the project. 
Moreover, they will be added to a `./uploads/pending` folder. Each upload will have a unique generated folder which will contain the files that the user requested to be translated. 

Example of folder structure for uploaded file:
 `./uploads/pending/4aff20d6-d45e-489d-b33b-37ff8f048175/2222-1611765881625.txt`
 
 `4aff20d6-d45e-489d-b33b-37ff8f048175` is a random generated string in order to keep track of the folder that are saved.

Filenames are also unique since after the name of the file is added the current datetime.

Example of filename:
`2222-1611765881625.txt`


The next validation process validates the file structure. Failing one of the files to pass validation will abort the process, and it will return a similar format message.

Succeeding passing the above stage it will result in initialization of the translation process.

Translating service communicates with the Tms-Api in order to receive translations. 
Tms-API returns responds in the following format:

```
{
  "success": true,
  "payload": {
    "source": "Hello World",
    "target": "Hallo Welt",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  }
}

``` 
Failing of finding a translation it will result to an empty ``target``.

Example:
```
{
  "success": true,
  "payload": {
    "source": "Hello World",
    "target": "",
    "sourceLanguage": "en",
    "targetLanguage": "de"
  }
}

```
Succeeding finding a translation will result in replacing the sentence, if not it will just add the initial sentence to the line.

After a successful translation it will save the file to a similar folder format   

`./uploads/pending/4aff20d6-d45e-489d-b33b-37ff8f048175/2222-1611765881625.txt`'

Finishing the last step involves sending with an email the translated files as attachments using `Sendgrid` service


### TMS API

### About

Tms-API main responsibilities is to translate sentences requested in the following format 

#### Documentation
You can find the Api Swagger file:

- non-dockerised setup [here](http://localhost:4000/api-docs).
- dockerised setup [here](http://127.0.0.1:4000/api-docs).


#### Setup
```
npm install
```

#### Test
You can run the tests like this:
```
npm test
```

#### Usage
The Tms API has two endpoints one for accepting sentences to translate `/translate` and another one for introducing new ones `/introduce`.

Example of `/translate` post request:
```
{
    "target": "Hallo Woeld",
	"sourceLanguage": "en",
	"targetLanguage": "de"
}
```

Example of `/introduce` post request:
```
[
  {
    "source": "Hello World",
    "target": "Hallo Welt",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "Hello guys",
    "target": "Hallo Leute",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  }
]
```

## Bonus
- validation added to TMS Api and UploadApi
- Swagger Documentation
- File validation for each line using regex.
- Multer for local storage
- Datadog-winston for logging

# ToDo
- Remove files and folders after they failed to pass validation or After they send via email.
- More unit - integration tests
- Enhance Sequence Diagrams
- TMS- Enhance  API to remove symbols from the right
- TMS - Verify that new translation do not exist before they added to DB

## Known issues
- Swagger does not display the file upload functionality on UI for `Upload Api`
