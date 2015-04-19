package corpus;

import java.io.File;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import util.FileUtils;

public class PersonSearch {
	

	public String getName() {
		return name;
	}
	
	public List<RawDocument> getResults() {
		return searchResults;
	}
	
	public Map<Integer, List<Integer>> getClusters() {
		return trueClustering;
	}
	
	public PersonSearch(String name) {
		this.name = name;
		this.searchResults = new ArrayList<RawDocument>();
		this.trueClustering = new HashMap<Integer, List<Integer>>();
		this.discardedDocuments = new ArrayList<Integer>();
	}
	
	public int readSearchResults(String path) throws IOException {
		if (Constants.DEBUG) {
			System.out.println("Reading search results for person: " + name);
		}
		String personFolderPath = path + "/" + Constants.WEB_PAGES + "/" + FolderName(name);
		String rawFolderPath = personFolderPath + "/" + Constants.RAW_FOLDER;
		File rawFolder = new File(rawFolderPath);
		String documentFolders[] = rawFolder.list(new FilenameFilter() {
			@Override
			public boolean accept(File dir, String name) {
				if (name.matches("\\.*"))
					return false;
				return true;
			}
		});
		for (int i = 0; i < documentFolders.length; i++) {
			String filePath = rawFolderPath + "/" + documentFolders[i] + "/index.html";
			if (Constants.DEBUG_DEEP) {
				System.out.println("Reading web document:" + filePath);
			}
			String fileContents = FileUtils.getFileContents(filePath);
			RawDocument d = new RawDocument(Integer.parseInt(documentFolders[i]), fileContents.toString());
			searchResults.add(d);
		}
		
		Collections.sort(searchResults, new Comparator<RawDocument>() {
			@Override
			public int compare(RawDocument o1, RawDocument o2) {
				if (o1.searchRank < o2.searchRank)
					return -1;
				if (o1.searchRank == o2.searchRank)
					return 0;
				return 1;
			}
		}); // Sort by rank.

		return searchResults.size();
	}
	
	public int readTrueClustering(String path) throws IOException {
		if (Constants.DEBUG) {
			System.out.println("Reading true clustering for person: " + name);
		}
		String truthFilename = path + "/" + Constants.TRUTH_FILES + "/" + FolderName(name) + ".clust.xml";
		if (Constants.DEBUG) {
			System.out.println("Reading Clustering File: " + truthFilename);
		}
		DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
		
		DocumentBuilder dBuilder;
		try {
			dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(new File(truthFilename));
			doc.getDocumentElement().normalize();
			NodeList children = doc.getFirstChild().getChildNodes();
			for (int i = 0; i < children.getLength(); i++) {
				Node node = children.item(i);
				if (node.getNodeName() == "entity" || node.getNodeName() == "discarded") {
					int clusterId = -1;
					if (node.getNodeName() == "entity")
						clusterId = Integer.parseInt(node.getAttributes().item(0).getNodeValue());
					List<Integer> cluster = new ArrayList<>();
					NodeList documentsInCluster = node.getChildNodes();
					for (int j = 0; j < documentsInCluster.getLength(); j++) {
						Node docNode = documentsInCluster.item(j);
						if (docNode.getNodeName() == "doc") {
							int docRef = Integer.parseInt(docNode.getAttributes().item(0).getNodeValue());
							cluster.add(docRef);
						}
					}
					if (clusterId != -1)
						trueClustering.put(clusterId, cluster);
					else
						discardedDocuments.addAll(cluster);
				}
			}
			if (Constants.DEBUG_DEEP) {
				System.out.println(trueClustering);
				System.out.println(discardedDocuments);
			}
			
		} catch (ParserConfigurationException | SAXException e) {
			e.printStackTrace();
			System.exit(-1); // Should never happen.
		}
		return 0;

		
	}
	
	public static String FolderName(String name) {
		return name.replaceAll(" ", "_");
	}
	
	private String name;
	private List<RawDocument> searchResults; // Ordered by rank.
	private Map<Integer, List<Integer>> trueClustering; // As described by the truth_values file.
	private List<Integer> discardedDocuments;
}
