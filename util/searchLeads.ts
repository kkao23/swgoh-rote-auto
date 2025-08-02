import type { DataType } from "~/models/data";
import { leads as leadsData } from "~/data/leads";
import { type data } from "~/models/data";

export function searchLeads(data: DataType, searchString: string) {
  // Normalize the search string to lowercase for case-insensitive matching
  const normalizedSearchString = searchString.toLowerCase();
  
  // Create a flattened array of all possible full names and aliases to search against
  const searchableLeads = leadsData.flatMap(lead => {
    // Add the full name and any aliases to a new array
    const names = [lead.fullName, ...lead.aliases];
    // Return an object for each name, containing the name and a reference to the full lead object
    return names.map(name => ({
      name: name.toLowerCase(),
      id: lead.id
    }));
  });

  const matchingResults: data[] = [];

  function traverse(currentData: DataType | data[] | any, path: string[]) {
    if (Array.isArray(currentData)) {
      // If it's an array, check each item
      for (const item of currentData) {
        // Use a type guard to check if the item is a Solution object before checking its lead property
        if (isSolution(item)) {
          const foundLead = searchableLeads.find(searchable => 
            item.lead.toLowerCase().includes(searchable.name) &&
            searchable.name.includes(normalizedSearchString)
          );
          if (foundLead) {
            matchingResults.push({
              ...item,
              path: path.join(' > ')
            });
          }
        }
        // No need to traverse further, as Solutions are the leaf nodes in the structure
      }
    } else if (typeof currentData === 'object' && currentData !== null) {
      // If it's an object, traverse its properties
      for (const key in currentData) {
        if (Object.prototype.hasOwnProperty.call(currentData, key)) {
          traverse(currentData[key], [...path, key]);
        }
      }
    }
  }

  // Type guard function to check if an object is a Solution
  function isSolution(obj: any): obj is data {
    return typeof obj === 'object' && obj !== null && 'lead' in obj && typeof obj.lead === 'string';
  }

  traverse(data, []);
  return matchingResults;
}