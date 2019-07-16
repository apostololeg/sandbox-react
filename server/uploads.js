import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import {
  AWS_SECRET,
  AWS_KEY_ID,
  DO_SPACE_NS,
  DO_SPACE_NAME
} from '../config/const';

aws.config.update({
  secretAccessKey: AWS_SECRET,
  accessKeyId: AWS_KEY_ID,
});

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint(DO_SPACE_NS);
const s3 = new aws.S3({ endpoint: spacesEndpoint });

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3,
    bucket: DO_SPACE_NAME,
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, req.headers['x-filename']);
    }
  })
}).single('file', 1);

export default function(app) {
  app.post('/upload', (req, res, next) => {
    upload(req, res, (error) => {
      if (error) {
        return res.status(400).send(error);
      }

      return res.sendStatus(200);
    });
  });
}
