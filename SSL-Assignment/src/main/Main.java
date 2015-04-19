package main;

import java.io.IOException;

import corpus.DataSet;
import corpus.ParsedDocument;
import corpus.PersonSearch;
import corpus.RawDocument;

public class Main {
	static final String PATH = "./weps2007_data_1.1/training/";
	public static void main(String[] argv) throws IOException {
		DataSet ds = new DataSet();
		ds.readPersonSearches(PATH);
		
		for (PersonSearch ps : ds.searches) {
			for (RawDocument rawDoc : ps.getResults()) {
				ParsedDocument pd = new ParsedDocument(rawDoc.searchRank, rawDoc.getContent());
				System.out.println(pd);
				//break;
			}
		}
	}
}
