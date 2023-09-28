export const computeDate = (date) => {
  const today = new Date();
  const new_date = new Date(date);

  const value =
    today.getFullYear() -
    new_date.getFullYear() -
    (today.getMonth() < new_date.getMonth() ||
      (today.getMonth() === new_date.getMonth() &&
        today.getDate() < new_date.getDate()));

  return value;
};
