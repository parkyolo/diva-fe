package com.diva.backend.util;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class RecommendArtist {
    public static int MAX_DIFF = 67;
    public int noteToMidi(String note, boolean roundMidi) {
        HashMap<Character, Integer> pitchMap = new HashMap<>();
        pitchMap.put('C', 0);
        pitchMap.put('D', 2);
        pitchMap.put('E', 4);
        pitchMap.put('F', 5);
        pitchMap.put('G', 7);
        pitchMap.put('A', 9);
        pitchMap.put('B', 11);

        HashMap<Character, Integer> accMap = new HashMap<>();
        accMap.put('#', 1);
        accMap.put('b', -1);
        accMap.put('!', -1);
        accMap.put('♯', 1);
        //accMap.put('𝄪', 2);
        accMap.put('♭', -1);
        //accMap.put('𝄫', -2);
        accMap.put('♮', 0);

        Pattern pattern = Pattern.compile("^([A-Ga-g])([#♯𝄪b!♭𝄫♮]*)([+-]?\\d+)?([+-]\\d+)?$");
        Matcher matcher = pattern.matcher(note);

        if (matcher.find()) {
            char pitch = Character.toUpperCase(matcher.group(1).charAt(0));
            int offset = 0;
            for (char o : matcher.group(2).toCharArray()) {
                offset += accMap.get(o);
            }

            int octave;
            if (matcher.group(3) == null) {
                octave = 0;
            } else {
                octave = Integer.parseInt(matcher.group(3));
            }

            double cents;
            if (matcher.group(4) == null) {
                cents = 0;
            } else {
                cents = Integer.parseInt(matcher.group(4)) * 1e-2;
            }

            double noteValue = 12 * (octave + 1) + pitchMap.get(pitch) + offset + cents;

            if (roundMidi) {
                noteValue = Math.round(noteValue);
            }

            return (int) noteValue;
        } else {
            throw new IllegalArgumentException("Improper note format: " + note);
        }
    }
}
