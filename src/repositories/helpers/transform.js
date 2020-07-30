/**
 * Transform helper class
 */
export class Transform {
  /**
   * Transform mongoose document to a simple object
   * @param {mongoose.Document} document
   * @return {Object}
   */
  mongoDocumentToSimpleStructure(document) {
    return JSON.parse(JSON.stringify(document));
  }
}
