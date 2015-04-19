package corpus;

import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.*;
import org.jsoup.select.Elements;

public class ParsedDocument extends RawDocument {

	private String title;
	private String documentText;
	private List<String> documentParagraphs;
	private List<String> highlightedParagraphs; // TODO implement highlighted paragraphs.
	
	
	public ParsedDocument(int searchRank, String content) {
		super(searchRank, content);
		this.title = "";
		this.documentText = "";
		parseContent();
	}
	
	private void parseContent() {
		Document doc = Jsoup.parse(getContent());
		Elements titles = doc.getElementsByTag("title");
		if (titles.size() > 0)
			this.title = titles.text();
		
		if (doc.body() != null)
			documentText = doc.body().text();
		
	}
	
	public String toString() {
		return title + "\n" + documentText;
	}

}
