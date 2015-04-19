package corpus;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class DataSet {
	public List<PersonSearch> searchResults;
	
	public DataSet() {
		searchResults = new ArrayList<>();
	}
	
	public int readPersonSearches(String path) throws IOException {
		if (Constants.DEBUG) {
			System.out.println("Reading all person search results from: " + path);
		}
		String descriptionFilesFolderPath = path + "/" + Constants.DESCRIPTION_FILES;
		File descriptionFilesFolder = new File(descriptionFilesFolderPath);
		String personDescriptionFiles[] = descriptionFilesFolder.list(new FilenameFilter() {
			@Override
			public boolean accept(File dir, String name) {
				if (name.matches("\\.*"))
					return false;
				return true;
			}
		});
		
		for (String personFile : personDescriptionFiles) {
			String personName = personFile.substring(0, personFile.length() - 4);
			personName = personName.replaceAll("_", " ");
			PersonSearch ps = new PersonSearch(personName);
			ps.readSearchResults(path);
			ps.readTrueClustering(path);
			searchResults.add(ps);
		}
		
		
		return 0;
	}
	
}
