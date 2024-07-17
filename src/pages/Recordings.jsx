import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { PlayCircle, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecordingItem = ({ recording, onLabelChange, onDelete }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon">
        <PlayCircle className="h-6 w-6" />
      </Button>
      <span>{recording.name}</span>
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
  </div>
);

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newRecording = {
        id: Date.now(),
        name: file.name,
        label: "not-crying",
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Baby Recordings</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Recording</h2>
        <div className="flex items-center space-x-4">
          <Input type="file" accept="audio/*" onChange={handleUpload} />
          <Button>Upload</Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Recordings</h2>
        {recordings.map((recording) => (
          <RecordingItem
            key={recording.id}
            recording={recording}
            onLabelChange={handleLabelChange}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Segmented Recordings</h2>
        <Tabs defaultValue="crying">
          <TabsList>
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
      </div>
    </div>
  );
};

export default Recordings;