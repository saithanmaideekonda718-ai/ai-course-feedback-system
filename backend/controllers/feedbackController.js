import Feedback from "../models/Feedback.js"
import Rating from "../models/Rating.js"
import Sentiment from "sentiment"

const sentiment = new Sentiment()

export const submitFeedback = async (req, res) => {

  try {

    const { course, comment, rating } = req.body

    const result = sentiment.analyze(comment)

    let sentimentLabel = "neutral"

    if (result.score > 0) sentimentLabel = "positive"
    if (result.score < 0) sentimentLabel = "negative"

    const feedback = await Feedback.create({
      course,
      comment,
      sentiment: sentimentLabel
    })

    await Rating.create({
      course,
      rating
    })

    res.json({
      message: "Feedback submitted",
      sentiment: sentimentLabel
    })

  } catch (error) {

    res.status(500).json({ message: error.message })

  }

}