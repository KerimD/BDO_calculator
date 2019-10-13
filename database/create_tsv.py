# Deniz Kerim
# 10/12/2019

import re


def round_number(n):
	return (int(n * 10000)) / 10000


def create_tsv(file_name):
	new_line = ''

	with open(file_name + '.txt') as f:

		# open file
		t = open(file_name + '.tsv', 'w')

		for line in f:
			print(line)
			line = re.split('\t+', line)[:-1]

			print(line)

			t.write(line[0] + '\t')

			for item in line[1:]:

				if item == ' ':
					t.write('\\N\t')
				else:
					if item[-1] == '%':
						item = item[:-1]

					t.write(str(float(item)) + '\t')
			t.write('\n')

		t.close()


create_tsv('armor')\
