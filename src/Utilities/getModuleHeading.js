export const getNewModuleHeading = module => {
    const headings = {
        "view-all": "Viewing all appointments",
        "book-new": "Booking a new appointment",
        "manage": "Managing an appointment"
    }

    return headings[module];
}