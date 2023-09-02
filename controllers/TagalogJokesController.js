const TagalogJokes = require('../models/TagalogJokes');

module.exports.showAllJokes = () => {
  return TagalogJokes.find({ isActive: true }).select('-isActive -_id -addedOn -__v')
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error('Error fetching jokes:', error);
      throw error;
    });
};

module.exports.addNewJoke = (data) => {
  
  return TagalogJokes.findOne({ id: data.id })

    .then((result) => {

      if (result === null) {
        
        let new_joke = new TagalogJokes({
          question: data.question,
          answer: data.answer,
          type: data.type,
          id: data.id
        });

        return new_joke.save()
          .then(() => {
            return { message: 'Added a new joke successfully!' };
          })
          .catch((error) => {
            console.error('Error saving the new joke:', error);
            throw error;
          });
      } else {
        return { message: 'Id is already taken!' };
      }
    })
    .catch((error) => {
      console.error('Error checking if the joke exists:', error);
      throw error;
    });
};

module.exports.getThisJoke = (data) => {
  
  return TagalogJokes.findOne({ id: data.id }).select('-isActive -_id -addedOn -__v')
    .then((result) => {

      // This provides a validation to check if the data params is existing in our database or not    
      if (!result) {
        return { message: 'Joke not found.' };
      }
      return result;
    })
    .catch((error) => {
      console.error('Error fetching the joke:', error);
      throw error;
    });
};

module.exports.updateThisJoke = (data, body) => {
  
  return TagalogJokes.findOneAndUpdate({ id: data.id }, {
    question: body.question,
    answer: body.answer,
    type: body.type
  })
    .then((updated_joke) => {

      // This provides a validation to check if the data params is existing in our database or not  
      if (!updated_joke) {
        return { message: 'Joke not found.' };
      }
      return { message: 'Joke has been successfully updated.' };
    })
    .catch((error) => {
      console.error('Error updating joke:', error);
      throw error;
    });
};

module.exports.getRandomJoke = async () => {
    try {
        // This counts the number of documents/number of jokes in our database
        const jokeCount = await TagalogJokes.countDocuments();

        // This ensures that value of jokeCount is always greater that 1
        if (jokeCount < 1) {
            throw new Error('No jokes found.');
        };

        // This generate an number using Math.random() using the inclusive and exclusive number provided
        const randomInteger = Math.floor(Math.random() * jokeCount) + 1;

        // Finds the Joke from our database, the select implies the excluded key in our return value
        const randomJoke = await TagalogJokes.findOne({ id: randomInteger }).select('-isActive -_id -addedOn -__v');

        if (!randomJoke) {
            throw new Error('Random joke not found.');
        }

        return randomJoke;
    } catch (error) {
        console.error('Error fetching a random joke:', error);
        throw error;
    }
};

module.exports.archiveJoke = (data) => {

    return TagalogJokes.findOneAndUpdate({ id: data.id }, { 
        isActive: false 
    }).then((archived_joke) => {

        // This provides a validation to check if the data params is existing in our database or not
        if (!archived_joke) {
          return { message: 'Joke not found.' };
        }

        return { message: 'Joke has been successfully archived.' };
      })
      .catch((error) => {

        // This catch all any other errors that can showed within our request
        return { message: 'An error occurred while archiving the joke.' };
      });

}

module.exports.activateJoke = (data) => {

    return TagalogJokes.findOneAndUpdate({ id: data.id }, { 
        isActive: true 
    }).then((activated_joke) => {

        if (!activated_joke) {
          return { message: 'Joke not found.' };
        }
        return { message: 'Joke is now available for use!' };
      })
      .catch((error) => {
        return { message: 'An error occurred while activating the joke.' };
      });
}