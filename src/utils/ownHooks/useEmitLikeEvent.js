// Emit the socket event for likes

exports.emitLike = (socket, productSlug, likes) => {
  const data = JSON.stringify({ productSlug, likes });

  socket.emit("like-f", data);
};

// Emit the socket event for dislike

exports.emitDislike = (socket, productSlug, likes) => {
  const data = JSON.stringify({ productSlug, likes });

  socket.emit("likes-d-f", data);
};
