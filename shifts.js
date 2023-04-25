function myFunction() {
  var ss = SpreadsheetApp.openByUrl(
     'https://docs.google.com/spreadsheets/d/1jWGZ3eRK4vgMotJ4INyoNDHrtCekP7-m5bHyOfiRBdU/edit#gid=0')
  
  var peopleGroup1 = 27;
  var peopleGroup2 = 26;
  
  var namesSheet = ss.getSheetByName("Names");
  var rangeGroup1 = namesSheet.getRange(2, 2, peopleGroup1 + 1, 2);
  var rangeGroup2 = namesSheet.getRange(2, 1, peopleGroup2 + 1, 1);
  
  
  function shuffleArray(array) {
  var i, j, temp;
  for (i = array.length - 2; i > 0; i--) {
    j = Math.floor((Math.random() * (i + 1)));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
  }
  
  function shuffleAndMix()
  {
    //shuffles names within each group
    rangeGroup1.setValues(shuffleArray(rangeGroup1.getValues()));
    rangeGroup2.setValues(shuffleArray(rangeGroup2.getValues()));
  
    // Takes names from group lists and puts them in a list where the names are mixed
    for (var y = 0; y <= peopleGroup1 + 1; y++)
    {
    personToCopy = namesSheet.getRange(2 + y, 2);
    personToCopy.copyTo(namesSheet.getRange(2*y + 2, 4));
    }
  
    for (var u = 0; u <= peopleGroup2 + 1; u++)
    {
    personToCopy = namesSheet.getRange(2 + u, 1);
    personToCopy.copyTo(namesSheet.getRange(2*u + 3, 4));
    }
    
    //personToMove = namesSheet.getRange(50, 4);
    //personToMove.copyTo(namesSheet.getRange(49, 4));
    //personToMove.clearContent(); 
  }
  
  shuffleAndMix();
  
  
  var newWeek = ss.insertSheet('New week');
  var newWeek2 = ss.insertSheet('New week 2');
  
  
  // copies formatting from template
  var templateSheet = ss.getSheetByName("Template");
  var formattedRange = templateSheet.getRange(1, 1, 20, 8);
  formattedRange.copyTo(newWeek.getRange(1, 1, 20, 8));
  formattedRange.copyTo(newWeek2.getRange(1, 1, 20, 8));
  
  // --- SHIFTS BY DAY ---
  
  // sets shifts
  shuffleAndMix();
  var w = 2;
  var b = 0;
  
  // sets meal shifts
  for (var t = 7; t >= 1; t--)
  {
    for (var i = 2; i <= 5; i++)
    {
      namesSheet.getRange(w, 4).copyTo(newWeek.getRange(i, t), {contentsOnly:true});
      
      //copies to lunch and dinner shifts
      newWeek.getRange(i, t).copyTo(newWeek.getRange(i + 11, t), {contentsOnly:true});
      newWeek.getRange(i, t).copyTo(newWeek.getRange(i + 15, t), {contentsOnly:true});
      
      w++;
    }
  }
  for (var t = 7; t >= 1; t--)
  {
    for (var i = 2; i <= 5; i++)
    {
      namesSheet.getRange(w, 4).copyTo(newWeek2.getRange(i, t), {contentsOnly:true});
      
      //copies to lunch and dinner shifts
      newWeek2.getRange(i, t).copyTo(newWeek2.getRange(i + 11, t), {contentsOnly:true});
      newWeek2.getRange(i, t).copyTo(newWeek2.getRange(i + 15, t), {contentsOnly:true});
      
      w++;
    }
  }
  
  // sets cleaning shifts
  for (var t = 7; t >= 1; t--)
  {
    for (var i = 6; i <= 12; i++)
    { 
      if (b <= 47)
      {
        // for week 1
        namesSheet.getRange(49 - b, 4).copyTo(newWeek.getRange(i, t), {contentsOnly:true});
        
        // for week 2
        namesSheet.getRange(b + 2, 4).copyTo(newWeek2.getRange(i, t), {contentsOnly:true});
        
        b++;
      }
    }
  }
  
  
  
  
  /* --- SHIFTS BY MEAL --- 
  
  // sets shifts
  shuffleAndMix();
  var w = 2;
  var b = 0;
  
  // sets meal shifts
  for (var t = 7; t >= 1; t--)
  {
    for (var i = 2; i <= 5; i++)
    {
      namesSheet.getRange(w, 4).copyTo(newWeek.getRange(i, t), {contentsOnly:true});
      w++;
    }
    for (var i = 13; i <= 16; i++)
    {
      namesSheet.getRange(w, 4).copyTo(newWeek.getRange(i, t), {contentsOnly:true});
      w++;
    }
    for (var i = 17; i <= 20; i++)
    {
      namesSheet.getRange(w, 4).copyTo(newWeek.getRange(i, t), {contentsOnly:true});
      w++;
    }
    if (w > 49)
    {
    shuffleAndMix();
    w = 2;
    }
    
    // sets cleaning shifts
    if (t <= 4 && t >= 3)
    {
      for (var i = 6; i <= 12; i++)
      {
        namesSheet.getRange(49 - b, 4).copyTo(newWeek.getRange(i, 5 - t), {contentsOnly:true});
        b++;
      }
    }
  }
  
  // more cleaning shifts
  for (var a = 7; a >= 4; a--)
    {
      peopleToCopy = newWeek.getRange(14, a, 7);
      peopleToCopy.copyTo(newWeek.getRange(6, a - 1, 7), {contentsOnly:true});
    }
  peopleToCopy = newWeek.getRange(14, 3, 7);
  peopleToCopy.copyTo(newWeek.getRange(6, 7, 7), {contentsOnly:true});
  */
}
