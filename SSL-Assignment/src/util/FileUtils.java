package util;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import corpus.RawDocument;

public class FileUtils {
	public static String getFileContents(String filePath) throws IOException {
		BufferedReader br = new BufferedReader(new FileReader(filePath));
		StringBuilder sb = new StringBuilder();
		String read = br.readLine();
		while (read != null) {
			sb.append(read);
			read = br.readLine();
		}
		br.close();
		return sb.toString();
	}
}
