##Python file to format the website rating list

master = open("masterlist.dat", "r");

names = []
ratings = []

for line in master:
        if line:
                tokens = line.split("(");
                name = tokens[0].replace("\n","") # name of the website
                rating = ""
                if (len(tokens) > 1):
                        ratings_str = tokens[1] #ratings (if there are any)
                        ratings_str = ratings_str.replace("(", "").replace(")", "").replace("\n","") #remove any parenthesis
                        rating_tokens = ratings_str.split(",") #split ratings by "," if there are more than one
                        rating = rating_tokens[0] # take the lowest raiting for now
                
                names.append(name.strip())
                ratings.append(rating.strip())

master.close();
	
names, ratings = zip(*sorted(zip(names, ratings)))

print names
print ratings


master_sorted = open("masterlist-sorted.dat", "w")
for i in range(len(names)):
	master_sorted.write((names[i]) + "," + (ratings[i]))
	
	if i < len(names) - 1:
		master_sorted.write("\n")
		
master_sorted.close()
