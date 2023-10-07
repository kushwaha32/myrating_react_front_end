exports.emitAvgRating = (socket, productSlug, avgRating) => {
  const data = JSON.stringify({ productSlug, avgRating });

  socket.emit("avgRating", data);
};
// brandAvgRating event
exports.emitBrandAvgRating = (socket, brandSlug, avgRating) => {
  const data = JSON.stringify({ brandSlug, avgRating });

  socket.emit("avgRating", data);
};

// rating distribution event
exports.emitRatingDistribution = (socket, productSlug, ratingTistribution) => {
  const data = JSON.stringify({ productSlug, ratingTistribution });
  socket.emit("ratingDistribution", data);
};

// Emit the socket event for dislike

exports.emitRatingDelete = (socket, productSlug, reviews) => {
  const data = JSON.stringify({ productSlug, reviews });

  socket.emit("review-d-f", data);
};
