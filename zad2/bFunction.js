function calculateB(x, y, z) {
    return Math.pow(Math.E, Math.abs(x-y)) * Math.pow((Math.pow(Math.tan(z), 2) + 1), x)
}

module.exports = calculateB;