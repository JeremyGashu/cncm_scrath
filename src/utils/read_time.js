export const readTime = (block) => {
    let paragraph = "";

    // eslint-disable-next-line array-callback-return
    block.map((block) => {
        switch (block.type) {
            case "paragraph":
                paragraph = paragraph + block.data.text;
                break;
            default:
                break;
        }
    });

    // average wordper minute reading time
    const averageWPM = 225;
    // counts all words in the paragrah
    const wordsCount = paragraph.trim().split(/\s+/).length;
    // calcualte the read time for words
    const time = Math.ceil(wordsCount / averageWPM);
    // returns time and paragraph
    return { time, paragraph };
};