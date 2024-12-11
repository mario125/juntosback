// src/utils/response.js

function apiResponse(status, message, data = null, code = 200) {
  return {
    status,
    message,
    data,
    code,
  };
}

function handleError(error, res) {
  console.error(error);
  if (error.name === 'SequelizeUniqueConstraintError') {
    const errorMessage = error.errors?.[0]?.message || 'Error inesperado';
    res
      .status(400)
      .json(
        apiResponse(
          false,
          `El correo electrónico ya está registrado: ${errorMessage}`,
          null,
          400
        )
      );
  } else if (error.name === 'ValidationError') {
    res.status(400).json(apiResponse(false, error.message, null, 400));
  } else {
    res
      .status(500)
      .json(
        apiResponse(
          false,
          'Hubo un error en el servidor. Intente nuevamente más tarde.',
          null,
          500
        )
      );
  }
}

module.exports = {
  apiResponse,
  handleError,
};
