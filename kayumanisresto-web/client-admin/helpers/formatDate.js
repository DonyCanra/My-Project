const formatDate = (input) => {
    let options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(input).toLocaleDateString("id-ID", options);
}

export default formatDate