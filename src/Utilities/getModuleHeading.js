// Lookup function to set the subheading on the app header automatically based on the chosen module
// Returns the corresponding heading for the selected module
export const getNewModuleHeading = module => {
    const headings = {
        "view-all": "Viewing all appointments",
        "book-new": "Booking a new appointment",
        "manage": "Managing an appointment"
    }

    return headings[module];
}