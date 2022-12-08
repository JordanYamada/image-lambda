// const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const AWS_SDK = require('aws-sdk');

const s3Client = new AWS_SDK.S3();

exports.handler = async (event) => {
    const {
      bucket,
      object
    } = event.Records[0].s3;
    
    let uploadedImage = await s3Client.getObject({
      Bucket: bucket.name,
      Key: object.key
    }).promise();

    let uploadedFile = await s3Client.getObject({
      Bucket: bucket.name,
      Key: 'images.json'
    }).promise();

    
    let jsonObject = JSON.parse(uploadedFile.Body.toString());
    
    jsonObject[jsonObject.length] = {"new key": "new value"};
    
    let newObject = await s3Client.putObject({
      Bucket: bucket.name,
      Key: 'images.json',
      Body: JSON.stringify(jsonObject), // what goes here?
    }).promise();
    
    
    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
