package main;

import java.io.IOException;

import corpus.DataSet;
import corpus.PersonSearch;

public class Main {
	static final String PATH = "./weps2007_data_1.1/training/";
	public static void main(String[] argv) throws IOException {
		DataSet ds = new DataSet();
		ds.readPersonSearches(PATH);
		
	}
}
