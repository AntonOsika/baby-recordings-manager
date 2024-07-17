import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayCircle, Trash2, Mic, StopCircle, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecordingItem = ({ recording, onLabelChange, onDelete }) => (
  <Card className="mb-4">
    <CardContent className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <PlayCircle className="h-6 w-6" />
        </Button>
        <span className="font-medium">{recording.name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Select
          value={recording.label}
          onValueChange={(value) => onLabelChange(recording.id, value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="crying">Crying</SelectItem>
            <SelectItem value="not-crying">Not Crying</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="icon" onClick={() => onDelete(recording.id)}>
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newRecording = {
        id: Date.now(),
        name: file.name,
        label: "not-crying",
        blob: file,
      };
      setRecordings([...recordings, newRecording]);
    }
  };

  const handleLabelChange = (id, newLabel) => {
    setRecordings(
      recordings.map((rec) =>
        rec.id === id ? { ...rec, label: newLabel } : rec
      )
    );
  };

  const handleDelete = (id) => {
    setRecordings(recordings.filter((rec) => rec.id !== id));
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const newRecording = {
          id: Date.now(),
          name: `Recording ${recordings.length + 1}`,
          label: "not-crying",
          blob: audioBlob,
        };
        setRecordings([...recordings, newRecording]);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingError(null);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setRecordingError("Error accessing microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Manage Baby Recordings</h1>

      {recordingError && (
        <Alert variant="destructive" className="mb-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{recordingError}</AlertDescription>
        </Alert>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Record or Upload</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <Button onClick={isRecording ? stopRecording : startRecording}>
              {isRecording ? (
                <>
                  <StopCircle className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" /> Start Recording
                </>
              )}
            </Button>
            <Input
              type="file"
              accept="audio/*"
              onChange={handleUpload}
              className="hidden"
              id="audio-upload"
            />
            <Button asChild>
              <label htmlFor="audio-upload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Upload Audio
              </label>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>All Recordings</CardTitle>
        </CardHeader>
        <CardContent>
          {recordings.map((recording) => (
            <RecordingItem
              key={recording.id}
              recording={recording}
              onLabelChange={handleLabelChange}
              onDelete={handleDelete}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segmented Recordings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="crying">
            <TabsList className="mb-4">
              <TabsTrigger value="crying">Crying</TabsTrigger>
              <TabsTrigger value="not-crying">Not Crying</TabsTrigger>
            </TabsList>
            <TabsContent value="crying">
              {recordings
                .filter((rec) => rec.label === "crying")
                .map((recording) => (
                  <RecordingItem
                    key={recording.id}
                    recording={recording}
                    onLabelChange={handleLabelChange}
                    onDelete={handleDelete}
                  />
                ))}
            </TabsContent>
            <TabsContent value="not-crying">
              {recordings
                .filter((rec) => rec.label === "not-crying")
                .map((recording) => (
                  <RecordingItem
                    key={recording.id}
                    recording={recording}
                    onLabelChange={handleLabelChange}
                    onDelete={handleDelete}
                  />
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recordings;