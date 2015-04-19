package corpus;

public class RawDocument {
	public int searchRank;
	private String content;
	
	public RawDocument(int searchRank, String content) {
		this.searchRank = searchRank;
		this.content = content;
	}
	
	public String getContent() {
		return content;
	}
	
	public String toString() {
		return searchRank + " " + content.length();
	}
}
