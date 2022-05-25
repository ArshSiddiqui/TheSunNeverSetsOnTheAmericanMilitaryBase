import csv
import json

def csvToJSON(file, jsonFile):
	bases = []

	with open(file, encoding='utf-8') as csvf:
		csvReader = csv.DictReader(csvf)

		for rows in csvReader:
			bases.append(rows)

	with open(jsonFile, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(bases, indent=4, ensure_ascii=False))

csvToJSON('MilitaryBases.csv', 'AmericanBases.json')