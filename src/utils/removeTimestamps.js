function removeTimestamps(data) {
  if (Array.isArray(data)) {
    return data.map(removeTimestamps);
  }

  if (data && typeof data === "object") {
    const cleaned = {};

    for (const key in data) {
      if (key === "createdAt" || key === "updatedAt") continue; // ignora esses campos
      cleaned[key] = removeTimestamps(data[key]); // aplica recursivamente
    }

    return cleaned;
  }

  return data;
}

module.exports = removeTimestamps;
