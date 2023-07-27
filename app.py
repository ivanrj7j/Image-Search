from flask import Flask, render_template, request
from PIL import Image
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.metrics.pairwise import cosine_similarity
import os
import json


app = Flask(__name__)

model = load_model('model.h5')
imageVectors = np.load('static/imageDB.vtr.npy')
imageList = os.listdir('static/imageDB')


def findSimilarImages(representation:np.ndarray):
    similarityVector = cosine_similarity(representation, imageVectors)[0].tolist()
    imageSimilarity = list(zip(imageList, similarityVector))
    rankedImages =  sorted(imageSimilarity, key=lambda x: x[1], reverse=True)[:99]

    rankedImagePaths =  ['/static/imageDB/'+img[0] for img in rankedImages]

    return [rankedImagePaths[i:i + 3] for i in range(0, len(rankedImagePaths), 3)]

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/searchImage', methods=['POST'])
def searchImage():
    searchImage = request.files['image']

    image = tf.convert_to_tensor(np.array(Image.open(searchImage).resize((256, 256))))

    imageFeatures = model.predict(tf.expand_dims(image, 0), verbose=False)

    similarImages = findSimilarImages(imageFeatures)

    return json.dumps(similarImages)

if __name__ == '__main__':
    app.run(debug=True)