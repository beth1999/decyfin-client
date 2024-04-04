import moment from "moment";

export const calculatePastedTime = (publicationDate: string | Date) => {
    const currentTime = moment();
    const pastedTime = moment(publicationDate);
    const difference = currentTime.diff(pastedTime, "minutes");

    if (difference === 0) {
        return `just now`;
    } else if (difference < 60) {
        return `${difference} minutes ago`;
    } else if (difference < 24 * 60) {
        return `${Math.floor(difference / 60)} hours ago`;
    } else if (difference < 48 * 60) {
        return "yesterday";
    } else {
        return pastedTime.format("MMMM Do YYYY, h:mm:ss a");
    }
};
