const checkFile = (type: string, size: number, file: File): boolean => {
  if (!file.type.startsWith(type)) {
    return false;
  }

  if (file.size / 1000000 > size) {
    return false;
  }

  return true;
};

export default checkFile;
