import axios from "axios";

export async function getImagesByQuery(query, page) {
    const response = await axios.get("https://pixabay.com/api/", {
        params: {
            key: "57499055-8c66904a7bf63fc07b4668785",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: 15,
        },
    });
    return response.data;
};