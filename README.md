# Image resizing project

## Overview
This project requires you to send filename of the image located in "images/full" folder and the width and height you want the image to be resized to in a get request so that the resized image will be created in "images/thumb" folder and displayed as a response.


## Scripts used
"start": used for nodemon module to watch the files and restart the server if file is changed and saved and this script is used with typescript for development.

"build": used for building typescript files in "src" folder to javascript in "dist" folder.

"jasmine": uses jasmine for testing.

"test": used to build and then uses jasmine for testing.

"server": used to run server.

"prettier": used to run prettier on typescript files.

"lint": uses eslint for typescript files.


## Instructions
In order to run tests write on terminal: npm run test.
In order to build typescript to javascript write on terminal: npm run build.
In order to run the server write on terminal: npm run server.
the endpoint used for the get request is: http://localhost:3000/api/images 
then use a get request to enter filename,width and height to resize and display image for example:
http://localhost:3000/api/images?filename=santamonica&width=800&height=400
the image name should be equivalent to the name of the image in "images/full" folder with out the extension of the image as the extension required to work with is jpg and it's assumed in the path used.
the resized image will be created in "images/thumb" folder.